export const adminAuth = (req, res, next) => {
    console.log("admin auth middleware")
    const token=xyx
    const isAdminAuthorised=token===xyz;
    if(!isAdminAuthorised){
        res.status(401).send("unauthorized request")
    }else{
        next();
    }

}