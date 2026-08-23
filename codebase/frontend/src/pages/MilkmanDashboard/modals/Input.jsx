export default function Input({ onChange, label, form, name, type, ...attr }) {
    if (type === "select") {
        return <div className="mk-form-group">
            <label>{label}</label>
            <select
                className="mk-form-select"
                {...form.register(name)}
                onChange={onChange}
            >
                {attr.options.map(opt => <option key={opt.label} value={opt.value}>{opt.label}</option>)}
            </select>
        </div>
    }
    return <div className="mk-form-group">
        <label>{label}</label>
        <input
            type={type}
            className="mk-form-input"
            {...form.register(name)}
            {...attr}
            onChange={onChange}
        />
    </div>
}