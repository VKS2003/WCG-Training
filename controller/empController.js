import { Employee } from '../models/employee.model.js';
import { publicUrl } from '../config.js';
import { getAddressData } from '../middlewares/axios.js';

export const empList = async (req, res, next) => {
    try {
        const empData = await Employee.find({});
        res.render('list', { empData, publicUrl })
    } catch (error) {
        next(error)
    }
}

export const addEmp = async (req, res, next) => {
    try {
        if (req.xhr) {
            const { emp_name,emp_email,emp_gender,emp_department,emp_designation,country,state, city}=req.body
            await Employee.create({emp_name,emp_email,emp_gender,emp_department,emp_designation,emp_resume:req.file.filename,emp_address:{ country,state, city}});
            return res.json({type:"success",message:'Employee Added Successfully'})
        }
        const country = await getAddressData('/country', {})
        res.render('add',{countries:country.data.data.countries})
    } catch (error) {
        next(error)
    }
}

export const deleteEmp = async (req, res, next) => {
    try {
        const id = req.params.id;
        await Employee.findByIdAndDelete(id);
        res.redirect('/employee')
    } catch (error) {
        next(error)
    }
}

export const getData = async (req, res, next) => {
    try {
        const { country, state } = req.query;
        if (!state) {
            const state = await getAddressData('/state', { country: country });
            return res.json({ states: state.data.data.states });
        }
        const city = await getAddressData('/city', { country: country, state: state });
        res.json({ cities: city.data.data.cities });
    } catch (error) {
        next(error)
    }
}

 