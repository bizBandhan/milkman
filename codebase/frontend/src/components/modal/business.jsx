import {
    UserRound,
    X,
} from 'lucide-react'
import React from 'react'
import { useForm } from "react-hook-form"
import { api } from "../../utils"
function Input({ label, id, name, value, ...attr }) {
    return <label htmlFor={id ?? name}>
        <span>{label}</span>
        <input id={id ?? name} name={name} value={value} {...attr} />
    </label>
}
export default function RegisterModal({
    onClose,
    business,
    user,
    pravah
}) {
    const form = useForm({
        defaultValues: business
    })
    React.useEffect(() => {
        let members = business?.members ?? []
        if (!members.includes(user?.value?._id)) members.push(user?.value?._id)
        form.reset({ ...business, members });
    }, [business, user])
    const onSubmit = async (data) => {
        let resp = Boolean(data._id) ? await api.put(`/api/v1/seller/${data._id}`, data) : await api.put(`/api/v1/seller`, data)
        console.log({ resp })
    }
    return (
        <div className="auth-overlay" role="dialog" aria-modal="true" aria-labelledby="auth-title">
            <div className="auth-modal">
                <button className="auth-close" type="button" onClick={onClose} aria-label="Close authentication">
                    <X size={18} />
                </button>
                <p className="eyebrow">Step 3</p>
                <h2 id="auth-title">Business details.</h2>
                <p className="auth-text">
                    Please provide your business details to complete the registration process. This information will help the customer reach you out easily.
                </p>

                <form className="registration-form" onSubmit={form.handleSubmit(onSubmit)}>

                    <Input
                        label="Business Name "
                        {...form.register("name", {
                            required: {
                                value: true,
                                message: "Name is required"
                            },
                            pattern: {
                                value: /^[a-z A-Z]+$/,
                                message: "Please type correct name"
                            },
                            minLength: { value: 2, message: "Name must be at least 2 character long" }
                        })}
                    />
                    <small className="small flex-end">Dairy or Milk Vendor Name</small>
                    <Input
                        label="Address"
                        {...form.register("address")}
                    />
                    <Input
                        label="UPI ID (to receive payments)"
                        {...form.register("upi.id", {
                            required: {
                                value: true,
                                message: "UPI ID is required"
                            }
                        })}
                    />
                    <small className="small flex-end">
                        We will use this information to share your customers to make online payments.
                    </small>
                    <div className="auth-actions full-span">
                        <button className="button button-primary" type="submit">
                            <UserRound size={18} />
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}