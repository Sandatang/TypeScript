import { useForm } from "react-hook-form";
import { User } from "../models/users";
import { LoginCredentials } from "../network/users_api";
import * as UserApi from "../network/users_api"
import { Alert, Button, Form, Modal } from "react-bootstrap";
import TextFormFields from "./fields/TextFormFields";
import styleUtils from "../styles/utils.module.css"
import { useState } from "react"
import { UnauthorizedError } from "../http-errors/http-error";

interface LoginModalProps {
    onDismiss: () => void,
    onLoginSuccesful: (user: User) => void
}

const LoginModalForm = ({ onDismiss, onLoginSuccesful }: LoginModalProps) => {

    const [errorText, setErrorText] = useState<string | null>(null)
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginCredentials>()

    async function onSubmit(credentials: LoginCredentials) {
        try {
            const user = await UserApi.signIn(credentials)
            onLoginSuccesful(user)
        } catch (error) {
            if (error instanceof UnauthorizedError) {
                setErrorText(error.message)
            } else {
                alert(error)
            }
            console.error(error)
        }
    }

    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>Log in</Modal.Header>
            <Modal.Body>
                {
                    errorText &&
                    <Alert variant="danger">
                        {errorText}
                    </Alert>
                }
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <TextFormFields
                        name="username"
                        label="Username"
                        type="text"
                        placehold="Username"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.username}
                    />
                    <TextFormFields
                        name="password"
                        label="Password"
                        type="password"
                        placehold="Password"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.password}
                    />

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className={styleUtils.width100}>
                        Log in
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}


export default LoginModalForm;