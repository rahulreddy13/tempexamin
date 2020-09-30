const Authenticate = async (req, res, next) => {
  
  try {
        const access_token = req.session.User_ID;
        if (!access_token) {

            return res.status(401).json({ 

                        ClearCookie:true,
                        Title        : 'Unauthorized',
                        Detail       : 'Authentication Credentials invalid',
                        ErrorMessage : `Couldn't Verify User`

                    });

        }else{

            next();  
        }

  } catch (err) {
    
    res.status(401).json({ 

        ClearCookie:true,
        Title        : 'Unauthorized',
        Detail       : 'Authentication Credentials invalid',
        ErrorMessage : `Couldn't Verify User`,

    });
  }
};

module.exports = { Authenticate };
