import * as React from "react"
import { cn } from "../../utils/utils.js"

const Field = React.forwardRef(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("space-y-2", className)} {...props} />
))
Field.displayName = "Field"

const FieldLabel = React.forwardRef(({ className, children, ...props }, ref) => (
    <label
        ref={ref}
        className={cn(
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            className
        )}
        {...props}
    >
        {children}
    </label>
))
FieldLabel.displayName = "FieldLabel"

const FieldContent = React.forwardRef(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("relative", className)} {...props} />
))
FieldContent.displayName = "FieldContent"

const FieldError = React.forwardRef(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn("text-xs font-medium text-destructive", className)}
        {...props}
    />
))
FieldError.displayName = "FieldError"

export { Field, FieldLabel, FieldContent, FieldError }
