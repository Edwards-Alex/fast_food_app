interface CustomHeaderProps {
    title?: string;
}

interface CustomInputProps {
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    label: string;
    secureTextEntery: boolean;
    keyboardType: "default" | "email-address" | "numeric" | "phone-pad"
}

interface ProfileFieldProps {
    label: string;
    value: string;
    icon: ImageSourcePropType;
}

interface CreateUserParams{
    email: string;
    password: string;
    name: string;
}

interface CustomButtonProps {
    onPress?: () => void;
    title?: string;
    style?: string;
    leftIcon?: React.ReactNode;
    textStyle?: string;
    isLoading?: boolean;
}

interface SignInParams {
    email: string;
    password: string;
}

interface TabBarIconProps {
    focused : boolean;
    icon: ImageSourcePropType;
    title : string;
}