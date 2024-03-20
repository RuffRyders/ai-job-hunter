interface LoadingOverlayProps {
    loading: boolean
}

export default function LoadingOverlay({ loading }: LoadingOverlayProps) {
    return loading ? (
        <div className="w-full text-center absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50 flex flex-col items-center justify-center">
            <div>Loading...</div>
        </div>
    ) : null
}
