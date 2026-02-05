import AdminSidebar from "@/components/navigations/SellerSideber";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex gap-x-4 ">
      <AdminSidebar></AdminSidebar>
      <section className="pl-[270px] w-full ">
        {/* <SellerNavber></SellerNavber> */}
        <div>{children}</div>
      </section>
    </section>
  );
}