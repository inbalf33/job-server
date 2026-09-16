const express = require("express");
const { getAllJobs, createJob, getJob, getMyJobs, updateJob, deleteJob, saveJob } = require("../models/jobsAccessDataService");
const auth = require("../../auth/authService");
const normalizeJob = require("../helpers/nomalizeJob");
const jobValidation = require("../validation/jobValidationService");
const { handleError, createError } = require("../../utils/handleErrors");
const router = express.Router();


// GET - all jobs
router.get("/", async (req, res) => {
    try {
        let allJobs = await getAllJobs();
        res.status(200).send(allJobs);        
    } catch (error) {
        // res.status(400).send(error.message);
        return handleError(res, error.status, error.message);
    }
})


// Get my job

router.get("/my-jobs", auth, async (req, res) => {
    try {
        
        // const {id} = req.body;
        const userInfo = req.user; 
       
        if(!userInfo.isRecruiter){
            // return res.status(403).send("Only Reruiter users can get my jobs")
            return createError("Authorization", "Only Reruiter users can get my jobs", 403)
        }
        
        let myJobs = await getMyJobs(userInfo._id);
        res.status(200).send(myJobs);        
    } catch (error) {
        // res.status(400).send(error.message);
        return handleError(res, error.status, error.message)
    }
});


// GET - specific jobs (get card by id)

router.get("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        let job = await getJob(id);
        res.status(200).send(job);        
    } catch (error) {
        // res.status(400).send(error.message);
        return handleError(res, error.status, error.message)
    }
});


// POST - create new job
router.post("/", auth, async (req, res) => {
    try {
        // בדיקה האם היוזר מפרסם או אדמין
        const userInfo = req.user;
        if (!userInfo.isRecruiter) {
            return createError("Authorization", "Only Recruiter users create new job", 403);
        }

        // ולידציה למידע שנשלח
        const validationErrorMessage = jobValidation(req.body);
        if (validationErrorMessage !== "") {
            return createError("Validation", validationErrorMessage, 400);
        }

        // נירמול הנתונים
        let normlizedJob = await normalizeJob(req.body, userInfo._id);
        let job = await createJob(normlizedJob);

        return res.status(201).send(job);      
    } catch (error) {
        return handleError(res, error.status, error.message);
    }
});

// PUT - Update job

router.put("/:id", auth, async (req, res) => {
    try {
        const {id} = req.params; // ID של המשרה

        const userInfo = req.user;
        const originalJobFromDB = await getJob(id); // קריאה לפונק' שמביאה את כל האובייקט של המשרה
        
        // בודק האם המשתמש אינו אדמין וְגם אינו יוצר המשרה
        if(!userInfo.isAdmin && userInfo._id != originalJobFromDB.recruiter_id){
            // return res.status(403).send("Only the job creator or admin can update")
            createError("Authorization", "Only the job creator or admin can update", 403)
        }
        
        // ולידציה למידע שנשלח
        const validationErrorMessage = jobValidation(req.body);
        if (validationErrorMessage != "") {
            return createError("validation", validationErrorMessage, 400)
        }

       // נירמול הנתונים
        let normlizedJob = await normalizeJob(req.body, userInfo._id);        

        // קריאה לפונקצית העדכון updatedJob שהיא אסינכורנית
        let job = await updateJob(id, normlizedJob)

        // סטטוס 201 כי החלפנו תוכן וזה כמו יצירה   
        res.status(201).send(job);        
    } catch (error) {
        // res.status(400).send(error.message);
        return handleError(res, error.status, error.message);
    }
});


// PUT - Delete job

router.delete("/:id", auth, async (req, res) => {
    try {
        const {id} = req.params;

        const userInfo = req.user;
        const originalJobFromDB = await getJob(id); 

        if(!userInfo.isAdmin && userInfo._id != originalJobFromDB.recruiter_id){
            // return res.status(403).send("Only the job creator or admin can delete")
            createError("Authorization", "Only the job creator or admin can delete", 403)
        }   

        let job = await deleteJob(id);  
        res.status(201).send(job);        
    } catch (error) {
        // res.status(400).send(error.message);
        return handleError(res, error.status, error.message);
    }
});

// Patch - Save job

router.patch("/:id", auth, async (req, res) => {
    try {
        const {id} = req.params;
        // ככה נועם עשה אבל זה יוצר בעיה אם בבאדי ניתן משתמש אחר ממי שמחובר זה יעבור
        // const {userId} = req.body;
        const userId = req.user._id; // 👈 לוקחים את ה-ID מהטוקן ולא מה-Body!
        
        let job = await saveJob(id, userId);  
        res.status(201).send(job);        
    } catch (error) {
        // res.status(400).send(error.message);
        return handleError(res, error.status, error.message);
    }
});

module.exports = router;