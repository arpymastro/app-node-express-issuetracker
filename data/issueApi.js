"use strict"

var issues = require('./issuesData').Issues;
var _ = require('lodash');

var _clone = (item) => {
    return JSON.parse(JSON.stringify(item));
};

var _getLastId = () => {
    return issues[issues.length - 1].id;
};

var IssueApi = {
    getAllIssues: (callback) => {
        callback(null, _clone(issues));
    },
    getIssueById: (id, callback) => {
        var issue = _.find(issues, {id: parseInt(id)});
        callback(null, _clone(issue));
    },
    addIssue: (newIssue, callback) => {
        var newId = _getLastId() + 1;
        newIssue.id = newId;
        issues.push(newIssue);
        callback(null, _clone(newIssue));
    },
    editIssue: (id, editedIssue, callback) => {
        var existingIssueIdx = _.indexOf(issues, _.find(issues, {id: parseInt(id)}));
        editedIssue.id = parseInt(id);
        issues.splice(existingIssueIdx, 1, editedIssue);
        callback(null); 
    },
    deleteIssue: (id, callback) => {
        _.remove(issues, {id: parseInt(id)});
        callback(null);
    }
};

module.exports = IssueApi;