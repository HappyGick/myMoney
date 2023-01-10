import { useState, ChangeEvent } from "react";

type ErroresFormulario<T> = {
    [P in keyof T]?: string;
};
type FuncionValidacion<T> = (form: T) => ErroresFormulario<T>;

export function Form<T>(initialForm: T, validateForm: FuncionValidacion<T>) {
    const [form, setForm]= useState(initialForm);
    const [errors, setErrors] = useState({} as ErroresFormulario<T>);

    const handleChange = ({target}:ChangeEvent<any>)=>{
        const { name, value } = target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const validar = () => {
        let errors = validateForm(form);
        let valid = true;
        setErrors(errors);
        for(let key in errors){
            if(errors[key] != ''){
                valid = false;
                break;
            }
        }
        return valid;
    };

    return {
        form,
        errors,
        handleChange,
        validar
    };
}
