import * as React from "react"
import { cn } from "../../utils/utils.js"

const InputGroup = React.forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "relative flex w-full items-stretch rounded-md border border-input bg-background shadow-sm focus-within:ring-1 focus-within:ring-ring",
            className
        )}
        {...props}
    />
))
InputGroup.displayName = "InputGroup"

const InputGroupAddon = React.forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "flex items-center px-3 text-muted-foreground border-r",
            className
        )}
        {...props}
    />
))
InputGroupAddon.displayName = "InputGroupAddon"

const InputGroupInput = React.forwardRef(({ className, type, ...props }, ref) => (
    <input
        type={type}
        className={cn(
            "flex h-9 w-full bg-transparent px-3 py-1 text-sm outline-none transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
            className
        )}
        ref={ref}
        {...props}
    />
))
InputGroupInput.displayName = "InputGroupInput"

const InputGroupButton = React.forwardRef(({ className, ...props }, ref) => (
    <button
        ref={ref}
        className={cn(
            "flex items-center px-3 text-muted-foreground hover:text-foreground border-l outline-none focus-visible:ring-1 focus-visible:ring-ring",
            className
        )}
        {...props}
    />
))
InputGroupButton.displayName = "InputGroupButton"

export { InputGroup, InputGroupAddon, InputGroupInput, InputGroupButton }
