export default function Loading() {
  return (
    <>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-999  bg-default rounded-[50%]">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-20 h-20 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </>
  );
}
