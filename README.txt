Intially WHEN we hit the localserver  with a GET request, it will return an  SIGN UP-HTML

-----IN the Signup HTML
    it will ask USERNAME,USER EMAIL AND PASSWORD

    the pssword will be stored in the db with hashing by using "BCRYPT" package a

    by the POST method with url '/postsignup'
    the data from the request body will store in the MONGODB with save()

    after this I use NODEMAILER to sent the useremail with Confirmation signup and with Welcome Details to the user email

    AFter the SUccesfull registartion it will be pop up like "SUCCESFULLY REGISTRATION DONE AND COnFIRMATION SENT TO THE EMAIL"


----- Login Page

    It will ask the username and PASSWORD

    after subnit the login ,
    the details will go the db and CHECK whether user is present in DB or not
    --If the use is not present in the Db it will pop USER EMAIL IS not present

    --if he Type wrong passowrd it shows  Wrong Password also and it pop like PLEASE CHECK THE PASSWORD

    -- if the useremail and password  are correct then ,
    by the JWT token i stored the userid in the token and stored the token in the cookie

---authentication

    when it comes to authentication  of the user by jwy compare function with the token and secret_key 
    the user id will stored in req.user

    Basically authentication is a middleware with the next() function to process into the another module

-- after SUCCESFULLY Login
    --it will redirect ro the DASHBOARD it shows the username and email from the req.user
    --to dusplay this information i use EJS


PLEASE GO THROUGH THE CODE AND I WRITE GOOD CODE AND OPTIMIZE ALL BUGS AND ALL CONDITIONS {THANK YOU}
