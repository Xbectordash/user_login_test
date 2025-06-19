const {getAllUsers,getUserById,createUser,createBulkUsers,updateUser,deleteUser} = require('../controller/user-controller');
const express = require('express');
const router = express.Router();


router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.post('/bulk/', createBulkUsers);
router.put('/:id',updateUser);
router.delete('/:id',deleteUser);

module.exports = router;