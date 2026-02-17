
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBoardStore } from "../../store/boardStore.js";
import { cn } from "../../utils/utils.js";
import { Button } from "../../components/ui/button.jsx";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../components/ui/card.jsx";
import {
    Field,
    FieldContent,
    FieldError,
    FieldLabel,
} from "../../components/ui/field.jsx";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "../../components/ui/input-group.jsx";

function validateEmail(value) {
    if (!value.trim()) {
        return "Email is required";
    }
    return;
}

function validatePassword(value) {
    if (!value) {
        return "Password is required";
    }
    return;
}

function ErrorAlert({ message }) {
    return (
        <div
            aria-live="polite"
            className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-destructive text-sm"
            role="alert"
        >
            {message}
        </div>
    );
}

function EmailField({ id, value, onChange, error }) {
    return (
        <Field data-invalid={!!error}>
            <FieldLabel htmlFor={id}>
                Email
                <span aria-label="required" className="text-destructive">
                    *
                </span>
            </FieldLabel>
            <FieldContent>
                <InputGroup aria-invalid={!!error}>
                    <InputGroupAddon>
                        <Mail aria-hidden="true" className="size-4" />
                    </InputGroupAddon>
                    <InputGroupInput
                        aria-describedby={error ? `${id}-error` : undefined}
                        aria-invalid={!!error}
                        autoComplete="email"
                        id={id}
                        inputMode="email"
                        name="email"
                        onChange={onChange}
                        placeholder="name@example.com…"
                        required
                        type="email"
                        value={value}
                    />
                </InputGroup>
                {error && <FieldError id={`${id}-error`}>{error}</FieldError>}
            </FieldContent>
        </Field>
    );
}

function PasswordField({
    id,
    value,
    onChange,
    showPassword,
    onTogglePassword,
    error,
}) {
    return (
        <Field data-invalid={!!error}>
            <FieldLabel htmlFor={id}>
                Password
                <span aria-label="required" className="text-destructive">
                    *
                </span>
            </FieldLabel>
            <FieldContent>
                <InputGroup aria-invalid={!!error}>
                    <InputGroupAddon>
                        <Lock aria-hidden="true" className="size-4" />
                    </InputGroupAddon>
                    <InputGroupInput
                        aria-describedby={error ? `${id}-error` : undefined}
                        aria-invalid={!!error}
                        autoComplete="current-password"
                        id={id}
                        name="password"
                        onChange={onChange}
                        placeholder="Enter your password…"
                        required
                        type={showPassword ? "text" : "password"}
                        value={value}
                    />
                    <InputGroupButton
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="min-h-[32px] min-w-[32px] touch-manipulation"
                        onClick={(e) => {
                            e.preventDefault();
                            onTogglePassword();
                        }}
                        type="button"
                    >
                        {showPassword ? (
                            <EyeOff aria-hidden="true" className="size-4" />
                        ) : (
                            <Eye aria-hidden="true" className="size-4" />
                        )}
                    </InputGroupButton>
                </InputGroup>
                {error && <FieldError id={`${id}-error`}>{error}</FieldError>}
            </FieldContent>
        </Field>
    );
}



export default function AuthLoginForm({
    className,
    defaultEmail = "",
    isLoading = false,
    errors,
}) {
    const navigate = useNavigate();
    const setUser = useBoardStore((state) => state.setUser);

    const [email, setEmail] = useState(defaultEmail);
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [localErrors, setLocalErrors] = useState({});

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();

            const emailError = validateEmail(email);
            const passwordError = validatePassword(password);

            if (emailError || passwordError) {
                setLocalErrors({
                    email: emailError,
                    password: passwordError,
                });
                return;
            }

            setLocalErrors({});

            setUser(email.trim());

            navigate("/dashboard");
        },
        [email, password, setUser, navigate]
    );

    const handleEmailChange = useCallback(
        (e) => {
            const value = e.target.value;
            setEmail(value);
            if (localErrors.email) {
                setLocalErrors((prev) => ({ ...prev, email: validateEmail(value) }));
            }
        },
        [localErrors.email]
    );

    const handlePasswordChange = useCallback(
        (e) => {
            const value = e.target.value;
            setPassword(value);
            if (localErrors.password) {
                setLocalErrors((prev) => ({
                    ...prev,
                    password: validatePassword(value),
                }));
            }
        },
        [localErrors.password]
    );

    const handleTogglePassword = useCallback(() => {
        setShowPassword((prev) => !prev);
    }, []);



    const emailError = errors?.email || localErrors.email;
    const passwordError = errors?.password || localErrors.password;
    const generalError = errors?.general;

    return (
        <Card className={cn("w-full max-w-sm shadow-xs", className)}>
            <CardHeader>
                <CardTitle>Sign in</CardTitle>
                <CardDescription>
                    Enter your credentials to access your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                    {generalError && <ErrorAlert message={generalError} />}

                    <div className="flex flex-col gap-4">
                        <EmailField
                            error={emailError}
                            id="login-email"
                            onChange={handleEmailChange}
                            value={email}
                        />

                        <PasswordField
                            error={passwordError}
                            id="login-password"
                            onChange={handlePasswordChange}
                            onTogglePassword={handleTogglePassword}
                            showPassword={showPassword}
                            value={password}
                        />


                    </div>

                    <Button
                        aria-busy={isLoading}
                        className="min-h-[44px] w-full touch-manipulation"
                        data-loading={isLoading}
                        disabled={isLoading}
                        type="submit"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 aria-hidden="true" className="size-4 animate-spin" />
                                Signing in…
                            </>
                        ) : (
                            "Sign in"
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
