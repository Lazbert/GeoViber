import { Field, Label, Switch } from '@headlessui/react'
import cx from "classnames"

interface SwitchToggleProps {
    enabled: boolean
    setEnabled: (enabled: boolean) => void
    className?: string
}

const SwitchToggle: React.FC<SwitchToggleProps> = ({ enabled, setEnabled, className }) => {
  return (
    <Field className={cx("text-base sm:text-lg flex items-center gap-3 select-none", className)}>
        <Label
          className={cx(
            "font-medium transition-colors duration-200",
            enabled ? "text-dark-lime" : "text-smoke/70"
          )}
        >
          Enable 3D
        </Label>
        <Switch
            checked={enabled}
            onChange={setEnabled}
            className={cx(
                "group relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-dark-lime/70",
                {
                    "bg-dark-lime animate-glow-pulse": enabled,
                    "bg-smoke/20": !enabled
                }
            )}
        >
            <span className="sr-only">Enable 3D Earth view</span>
            <span
                aria-hidden="true"
                className={cx(
                "pointer-events-none inline-block h-7 w-7 transform rounded-full bg-smoke shadow-lg ring-0 transition duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                {
                    "translate-x-6": enabled,
                    "translate-x-0": !enabled
                },
                )}
            />
        </Switch>
    </Field>
  )
}

export default SwitchToggle
