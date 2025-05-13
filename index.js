const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Configuration
const PORT = 4364; // Change the port here

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Grading function
function getGrade(percentage) {
    if (percentage >= 80) return "A";
    if (percentage >= 70) return "B";
    if (percentage >= 60) return "C";
    if (percentage >= 50) return "D";
    if (percentage >= 40) return "E";
    return "F";
}

// Routes
app.get('/', (req, res) => {
    res.render('index', { result: null, grade: null, total: null });
});

app.post('/', (req, res) => {
    const score = parseFloat(req.body.score);
    const total = parseFloat(req.body.total);

    if (!isNaN(score) && !isNaN(total) && total !== 0) {
        const percentage = ((score / total) * 100).toFixed(2);
        const grade = getGrade(percentage);
        res.render('index', { result: percentage, grade: grade, total: total });
    } else {
        res.render('index', { result: "Invalid input", grade: null, total: total });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
