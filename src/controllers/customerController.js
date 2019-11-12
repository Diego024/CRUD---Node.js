const controller = {};

controller.read = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM tbclientes', (err, clientes) => {
            if (err) {
                res.json(err);
            }
            res.render('customers', {
                data: clientes
            });
        });
    });
};

controller.add = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO tbclientes SET ?', data, (err, rows) => {
            if (err) {
                res.json(err);
            }else{
                res.redirect('/');
            }
        })
    })
}

controller.delete = (req, res) => {
    const id = req.params.id;
    req.getConnection ((err, conn) => {
        conn.query('DELETE FROM tbclientes WHERE id_cliente = ?', [id], (err, rows) => {
            res.redirect('/');
        });
    });
}

controller.edit = (req, res) => {
    const id = req.params.id;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM tbclientes WHERE id_cliente = ?', [id], (err, clientes) => {
            
            res.render('customer_edit',{
                data: clientes[0]
            })
        })
    })
}

controller.update = (req, res) => {
    const id = req.params.id;
    const newCustomer = req.body;
    req.getConnection((err, conn) => {
        conn.query('UPDATE tbclientes SET ? WHERE id_cliente = ?', [newCustomer, id], (err, rows) => {
            if (err) {
                res.json(err);
            }
            res.redirect('/');
        });
    });
}

module.exports = controller;