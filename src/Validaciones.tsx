import { useState, ChangeEvent } from "react";

export const Validacion = (initialForm: any, validateForm: any)=>{
    const [form, setForm]= useState(initialForm);
    const [errors, setErrors] = useState({nombre:'',monto:'',fecha:'',mensaje:'',Saldo:'',NumeroCuenta:'',TipoCuenta:''});

    const handleChange = ({target}:ChangeEvent<HTMLInputElement>)=>{
        const {name,value} = target;
        setForm({
            ...form,
            [name]:value,
        });
    }
    const handleBlur = (e: any)=>{
        handleChange(e);
        setErrors(validateForm(form));
    }

    return {
        form,errors,handleChange,handleBlur}

}
