app.get('/users', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
  
    // Contoh data statis users
    const users = [
      { username: 'user1' },
      { username: 'user2' },
      // ...
    ];
  
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
  
    const results = users.slice(startIndex, endIndex);
  
    res.json(results);
  });
  