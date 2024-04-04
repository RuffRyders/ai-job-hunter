interface LoadingOverlayProps {
  loading: boolean
  displayText?: string
}

export default function LoadingOverlay({
  loading,
  displayText,
}: LoadingOverlayProps) {
  return loading ? (
    <div className="fixed w-full text-center top-0 left-0 right-0 bottom-0 bg-black opacity-50 flex flex-col items-center justify-center z-50">
      <div className="text-white text-3xl">{displayText ?? 'Loading...'}</div>
    </div>
  ) : null
}
