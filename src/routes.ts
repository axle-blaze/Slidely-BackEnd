import { Router } from 'express';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

const router = Router();
const dbPath = path.join(__dirname, 'db.json');

interface Submission {
    name: string;
    email: string;
    phone: string;
    githubLink: string;
    stopwatchTime: string;
}

const readDb = (): Submission[] => {
    const data = readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
};

const writeDb = (data: Submission[]) => {
    writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
};

router.get('/ping', (req, res) => {
    res.send(true);
    res.status(201).send('Server working');
});

router.post('/submit', (req, res) => {
    const { name, email, phone, githubLink, stopwatchTime } = req.body;
    const newSubmission: Submission = { name, email, phone, githubLink, stopwatchTime };
    const submissions = readDb();
    submissions.push(newSubmission);
    writeDb(submissions);
    res.status(201).send('Submission saved');
});

router.get('/read', (req, res) => {
    const index = parseInt(req.query.index as string);
    const submissions = readDb();
    if (index >= 0 && index < submissions.length) {
        res.json(submissions[index]);
    } else {
        res.status(404).send('Submission not found');
    }
});

export default router;
