exports.middlewareGlobal = (req, res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.sucess = req.flash('sucess');
    res.locals.user = req.session.user;
    next();
  };

  exports.loginRequired = (req, res, next) => {
    if (!req.session.user)  {
      req.flash('errros', 'voce precisa fazer login');
      req.session.save(()=> {
        res.redirect('/');

      })
      return;
    }
    next();
  }