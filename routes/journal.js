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
        let query = "SELECT journal_id, MAX( CASE WHEN setting_name = 'name' THEN setting_value ELSE NULL END ) AS name, MAX( CASE WHEN setting_name = 'description' THEN setting_value ELSE NULL END ) AS summary, MAX( CASE WHEN setting_name = 'publisherInstitution' THEN setting_value ELSE NULL END ) AS publisher, MAX( CASE WHEN setting_name = 'onlineIssn' THEN setting_value ELSE NULL END ) AS online_issn, MAX( CASE WHEN setting_name = 'printIssn' THEN setting_value ELSE NULL END ) AS print_issn, MAX( CASE WHEN setting_name = 'about' THEN setting_value ELSE NULL END ) AS about FROM ( SELECT js.journal_id, setting_value, setting_name FROM journal_settings js LEFT OUTER JOIN journals j ON js.journal_id = j.journal_id WHERE j.enabled = 1 AND j.journal_id = '"+ journalId +"' ) js GROUP BY journal_id";

        db.query(query, (err, result) => {
            if(err){
                return res.status(500).send(err);
            }

            res.json(result)
        })
    },
    searchJournal: (req, res) => {
        let journalName = req.query.name;
        let query = "SELECT journal_id, MAX( CASE WHEN setting_name = 'name' THEN setting_value ELSE NULL END ) AS name, MAX( CASE WHEN setting_name = 'description' THEN setting_value ELSE NULL END ) AS summary, MAX( CASE WHEN setting_name = 'publisherInstitution' THEN setting_value ELSE NULL END ) AS publisher, MAX( CASE WHEN setting_name = 'onlineIssn' THEN setting_value ELSE NULL END ) AS online_issn, MAX( CASE WHEN setting_name = 'printIssn' THEN setting_value ELSE NULL END ) AS print_issn, MAX( CASE WHEN setting_name = 'about' THEN setting_value ELSE NULL END ) AS about FROM ( SELECT js.journal_id, setting_value, setting_name FROM journal_settings js LEFT OUTER JOIN journals j ON js.journal_id = j.journal_id WHERE j.enabled = 1 ) js WHERE js.setting_value LIKE '"+ journalName +"' GROUP BY journal_id";
        console.log(journalName);
        db.query(query, (err, result) => {
            if(err){
                return res.status(500).send(err);
            }


            res.json(result);
        })
    }
};