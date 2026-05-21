export default function Loading() {
    return (
        <div className="flex min-h-[70vh] items-center justify-center bg-slate-50">
            <div className="text-center">
                <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-slate-200 border-t-amber-500" />

                <h2 className="mt-5 text-xl font-black text-slate-900">
                    Loading DriveFleet...
                </h2>

                <p className="mt-2 text-sm font-medium text-slate-500">
                    Please wait while we prepare your page.
                </p>
            </div>
        </div>
    );
}