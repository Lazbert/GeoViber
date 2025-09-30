import { Field, Label, Switch } from '@headlessui/react'
import cx from "classnames"

interface SwitchToggleProps {
    enabled: boolean
    setEnabled: (enabled: boolean) => void
    className?: string
}

const SwitchToggle: React.FC<SwitchToggleProps> = ({ enabled, setEnabled, className }) => {
  return (
    <Field className={cx("text-[20px] flex items-center gap-3", className)}>
        <Label>Enable 3D</Label>
        <Switch
            checked={enabled}
            onChange={setEnabled}
            className={cx(
                "relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75",
                {
                    "bg-dark-lime": enabled,
                    "bg-slate-500": !enabled
                }
            )}
        >
            <span className="sr-only">Use setting</span>
            <span
                aria-hidden="true"
                className={cx(
                "pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out",
                {
                    "translate-x-9": enabled,
                    "translate-x-0": !enabled
                },
                )}
            />
        </Switch>
    </Field>
  )
}

export default SwitchToggle