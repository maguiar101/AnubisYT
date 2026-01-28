
function Footer() {
  return (
    <>
      <footer className="bg-gray-600/55 text-white py-4 mt-10">
        <div className="container mx-auto text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Anubis. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}

export default Footer
