import {
    UserRound,
    X,
} from 'lucide-react'
import React from 'react'
import { useForm } from "react-hook-form"
import {api} from "../../utils"
function Input({ label, id, name, value, ...attr }) {
    return <label htmlFor={ id ?? name }>
        <span>{ label }</span>
        <input id={ id ?? name } name={ name } value={ value } { ...attr } />
    </label>
}
export default function RegisterModal({
    onClose,
    user
}) {
    // const [registration,setRegistration]=React.useState(user)
    const form = useForm({
        defaultValues: user
    })
    React.useEffect(() => {
        form.reset(user);
    }, [user])
    const onSubmit = async (data) => {
        const resp=await api.put(`/api/v1/me`,data)
        console.log(resp)
    }
    return (
        <div className="auth-overlay" role="dialog" aria-modal="true" aria-labelledby="auth-title">
            <div className="auth-modal">
                <button className="auth-close" type="button" onClick={ onClose } aria-label="Close authentication">
                    <X size={ 18 } />
                </button>
                <p className="eyebrow">Step 2</p>
                <h2 id="auth-title">Complete your registration.</h2>
                <p className="auth-text">
                    We require a few more information to serve you better, Please fill the form below
                </p>

                <form className="registration-form" onSubmit={ form.handleSubmit(onSubmit) }>
                    
                    <Input
                        label="Name"
                        { ...form.register("name", {
                            required: {
                                value: true,
                                message: "Name is required"
                            },
                            pattern: {
                                value: /^[a-z A-Z]+$/,
                                message: "Please type correct name"
                            },
                            minLength: { value: 2, message: "Name must be at least 2 character long" }
                        }) }
                    />
                    <Input
                        label="E-Mail"
                        { ...form.register("email") }
                    />
                    <label>
                        <span>Gender</span>
                        <select { ...form.register("gender", { required: { value: true, message: "Gender is required" } }) }>
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </label>

                    <label>
                        <span>Role</span>
                        <select { ...form.register("role") }>
                            <option value="milkman">Milk vendor</option>
                            <option value="customer">Customer</option>
                        </select>
                    </label>
                    <label className="full-span">
                        <span>Address</span>
                        <textarea { ...form.register("address") } />
                    </label>



                    <div className="auth-actions full-span">
                        <button className="button button-primary" type="submit">
                            <UserRound size={ 18 } />
                            Complete registration
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}