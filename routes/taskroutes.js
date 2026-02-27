const express=require("express");
const db=require("../db/db");
const authenticatetoken=require("../middleware/authmiddleware");
const router=express.Router();

router.post("/create",authenticatetoken,(req,res)=>
{
    const {title,description,start_time}=req.body;
    if(!title || !start_time)
    {
        return res.status(400).json({message:"Title and start_time is required"});

    }
    const userid=req.user.id;
    db.query(`INSERT INTO tasks (title,description,start_time,user_id) VALUES 
        (?,?,?,?)`,[title,description,start_time,userid],
        (err,result)=>{
    if(err)
    {
        console.log(err);
        return res.status(500).json({message:"Database error"});

    }
    res.json({
        message:"Task created successfully"
    });
        }
    )
});
router.get("/all",authenticatetoken,(req,res)=>
{
    const userid=req.user.id;
    db.query(`SELECT * FROM tasks WHERE user_id=?`,[userid],
        (err,result)=>{
            if(err)
            {
                console.log(err);
                return res.status(500).json({message:"Database Error"});
            }
            res.json(result);

        }
    )
})

router.put("/update/:id",authenticatetoken,(req,res)=>
{
    const taskid=req.params.id;
    const {title,description,start_time}=req.body;
    const userid = req.user.id;
 db.query(
        "SELECT * FROM tasks WHERE id = ?",
        [taskid],
        (err, result) => {

            if (err) return res.status(500).json({message:"Database error"});

            if (result.length === 0) {
                return res.status(404).json({message:"Task not found"});
            }

            const task = result[0];

            // Step 2: Check ownership
            if (task.user_id !== userid) {
                return res.status(403).json({message:"Unauthorized access"});
            }
        }
    )


    db.query(`UPDATE tasks SET title=?,description=?,start_time=? WHERE id=? AND user_id=?`,
        [title,description,start_time,taskid,userid],
        (err,result)=>
        {
            if(err)
            {
                console.log(err);
                return res.status(500).json({message:"Database Error"});
            }
            if(result.affectedRows===0)
            {

                return res.status(403).json({message:"Not Authorized or Task not found"});
            }
            res.json({message:"Task updated successfully"});
            }
        
    )
    
});


router.delete("/delete/:id", authenticatetoken, (req, res) => {

    const taskid = req.params.id;
    const userid = req.user.id;

   
    db.query(
        "SELECT * FROM tasks WHERE id = ?",
        [taskid],
        (err, result) => {

            if (err) res.status(500).json({message:"Database Error"});

            if (result.length === 0) {
                return res.status(404).json({message:"Task not found"});
            }

            const task = result[0];

            if (task.user_id !== userid) {
                return res.status(403).json({message:"Unauthorized access"});
            }

            
            db.query(
                "DELETE FROM tasks WHERE id = ?",
                [taskid],
                (err2) => {

                    if (err2) res.status(500).json({message:"Database Error"});

                    res.json({ message: "Task deleted successfully" });
                }
            );
        }
    );
});



module.exports=router;