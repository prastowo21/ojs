module.exports = {
    getJournal: (req, res) => {
        let query = "SELECT journal_id, MAX( CASE WHEN setting_name = 'name' THEN setting_value ELSE NULL END ) AS name, MAX( CASE WHEN setting_name = 'description' THEN setting_value ELSE NULL END ) AS summary, MAX( CASE WHEN setting_name = 'publisherInstitution' THEN setting_value ELSE NULL END ) AS publisher, MAX( CASE WHEN setting_name = 'onlineIssn' THEN setting_value ELSE NULL END ) AS online_issn, MAX( CASE WHEN setting_name = 'printIssn' THEN setting_value ELSE NULL END ) AS print_issn, MAX( CASE WHEN setting_name = 'about' THEN setting_value ELSE NULL END ) AS about FROM ( SELECT js.journal_id, setting_value, setting_name FROM journal_settings js LEFT OUTER JOIN journals j ON js.journal_id = j.journal_id WHERE j.enabled = 1 ) js GROUP BY journal_id"; // query database to get all the players

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            res.json(result)
        });
    },
    getJournalById: (req, res) => {
        let journalId = req.params.id;
        let query = "SELECT journal_id, MAX( CASE WHEN setting_name = 'name' THEN setting_value ELSE NULL END ) AS name, MAX( CASE WHEN setting_name = 'description' THEN setting_value ELSE NULL END ) AS summary, MAX( CASE WHEN setting_name = 'publisherInstitution' THEN setting_value ELSE NULL END ) AS publisher, MAX( CASE WHEN setting_name = 'onlineIssn' THEN setting_value ELSE NULL END ) AS online_issn, MAX( CASE WHEN setting_name = 'printIssn' THEN setting_value ELSE NULL END ) AS print_issn, MAX( CASE WHEN setting_name = 'about' THEN setting_value ELSE NULL END ) AS about FROM ( SELECT js.journal_id, setting_value, setting_name FROM journal_settings js LEFT OUTER JOIN journals j ON js.journal_id = j.journal_id WHERE j.enabled = 1 AND j.journal_id = '" + journalId + "' ) js GROUP BY journal_id";

        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            res.json(result)
        })
    },
    searchJournal: (req, res) => {
        let journalName = req.query.name;
        let query = "SELECT journal_id, MAX( CASE WHEN setting_name = 'name' THEN setting_value ELSE NULL END ) AS name, MAX( CASE WHEN setting_name = 'description' THEN setting_value ELSE NULL END ) AS summary, MAX( CASE WHEN setting_name = 'publisherInstitution' THEN setting_value ELSE NULL END ) AS publisher, MAX( CASE WHEN setting_name = 'onlineIssn' THEN setting_value ELSE NULL END ) AS online_issn, MAX( CASE WHEN setting_name = 'printIssn' THEN setting_value ELSE NULL END ) AS print_issn, MAX( CASE WHEN setting_name = 'about' THEN setting_value ELSE NULL END ) AS about FROM ( SELECT js.journal_id, setting_value, setting_name FROM journal_settings js LEFT OUTER JOIN journals j ON js.journal_id = j.journal_id WHERE j.enabled = 1 ) js WHERE js.setting_value LIKE '" + journalName + "'  GROUP BY journal_id";
        console.log(journalName);
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }


            res.json(result);
        })
    },
    getAnnouncement: (req, res) => {
        let query = "SELECT announcement_id, c.type_id, MAX( CASE WHEN setting_name = 'title' THEN setting_value ELSE NULL END ) AS title, MAX( CASE WHEN setting_name = 'description' THEN setting_value ELSE NULL END ) AS description, MAX( CASE WHEN setting_name = 'descriptionShort' THEN setting_value ELSE NULL END ) AS descriptionShort, c.date_expire, c.date_posted FROM ( SELECT a.announcement_id, a.date_expire, a.date_posted, type_id, setting_value, setting_name FROM announcement_settings b INNER JOIN announcements a ON b.announcement_id = a.announcement_id ) c GROUP BY announcement_id"

        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }

            res.json(result)
        })
    },
    getAnnouncementById: (req, res) => {
        let announcement_id = req.params.id;
        let query = "SELECT announcement_id, c.type_id, MAX( CASE WHEN setting_name = 'title' THEN setting_value ELSE NULL END ) AS title, MAX( CASE WHEN setting_name = 'description' THEN setting_value ELSE NULL END ) AS description, MAX( CASE WHEN setting_name = 'descriptionShort' THEN setting_value ELSE NULL END ) AS descriptionShort, c.date_expire, c.date_posted FROM ( SELECT a.announcement_id, a.date_expire, a.date_posted, type_id, setting_value, setting_name FROM announcement_settings b INNER JOIN announcements a ON b.announcement_id = a.announcement_id WHERE a.announcement_id = '" + announcement_id + "' ) c GROUP BY announcement_id"

        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }

            res.json(result)
        })
    },
    getIssueById: (req, res) => {
        let issue_id = req.params.id
        let query = "SELECT a.issue_id, volume, number, year, file_name, file_type, file_size, content_type, original_file_name, date_uploaded FROM issue_files a INNER JOIN issues b ON a.issue_id = b.issue_id WHERE b.journal_id = '" + issue_id + "'"

        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }

            res.json(result)
        })
    },
    downloadIssueFile: (req, res) => {
        res.download('D:/xampp/htdocs/ojs/files/journals/2/issues/1/public/1-1-PB.pdf', 'report.pdf', function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('downloading successful');
            }
        })
    }
};