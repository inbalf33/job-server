const generateJobNumber = require("./generateJobNumber");

const normalizeJob = async (rawJob, userId) => {
    return {
        ...rawJob,
        image: {
            url: rawJob.image?.url || `https://placehold.co/600x400?text=${rawJob.company || 'Job'}`,
            alt: rawJob.image?.alt || rawJob.title || 'Job image',
        },
        jobNumber: rawJob.jobNumber || (await generateJobNumber()),
        recruiter_id: rawJob.recruiter_id || userId,
    };
};

module.exports = normalizeJob;