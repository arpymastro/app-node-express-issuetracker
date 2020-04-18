var IssueApi = require('../data/issueApi');
var express = require('express');
var router = express.Router();

var dateFormat = require('dateFormat');

var allSeverity = ['Normal', 'Medium', 'High'];
var allStatus = ['Open', 'In Progress', 'Closed'];

router.get('/', (req, res) => {
    IssueApi.getAllIssues((err, items) => {
        res.render('issue/index', { title: 'Issue Tracker', issues: items });
    });
});

router.get('/add', (req, res) => {
    res.render('issue/add', { title: 'Add Issue - Issue Tracker', severities: allSeverity, statuses: allStatus});
});

router.post('/add', (req, res) => {
    var issue = {};
    issue.description = req.body.description;
    issue.severity = req.body.severity;
    issue.status = req.body.status;
    issue.createdDate = dateFormat(new Date(), 'dd-MM-yyyy hh:mm', 'en-US');

    IssueApi.addIssue(issue, (err, issue) => {
        res.redirect('/Issues');
    });
});

router.get('/edit/:id', (req, res) => {
    IssueApi.getIssueById(req.params.id, (err, issue) => {
        res.render('issue/edit', { title: 'Edit Issue - Issue Tracker', issue: issue, severities: allSeverity, statuses: allStatus})
    });
});

router.post('/edit/:id', (req, res) => {
    var updatedIssue = {};
    
    updatedIssue.description = req.body.description;
    updatedIssue.severity = req.body.severity;
    updatedIssue.status = req.body.status;
    updatedIssue.createdDate = req.body.createdDate;
    if(req.body.status === 'Closed')
    {
        updatedIssue.resolvedDate = dateFormat(new Date(), 'dd-MM-yyyy hh:mm', 'en-US');
    }

    IssueApi.editIssue(req.params.id, updatedIssue, (err) => {
        res.redirect('/Issues');
    })
});

router.get('/delete/:id', (req, res) => {
    IssueApi.deleteIssue(req.params.id, (err) => {
        res.redirect('/Issues');
    });
});

module.exports = router;