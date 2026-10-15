


const logOut = async (_, res) => {
    try {
         res.clearCookie("token")
         return res.status(200).json({message:"User Logout Successfully"})
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = logOut