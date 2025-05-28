import { useEffect, useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { apiUrl } from "../../component/htpds";
import Loading from "../../component/Loading";
import { Link } from "react-router-dom";

const Footer = () => {
  const [loading, setLoading] = useState(false);
  const [footer, setFooter] = useState([]);

  const fetchAllFooters = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/getfooter`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const result = await response.json();
      console.log("Footer Data:", result);
      setLoading(false);

      if (result.status === 200) {
        setFooter(result.data);
      } else {
        console.error("Fetch Footer Error:", result.message);
      }
    } catch (error) {
      setLoading(false);
      console.error("Fetch Footer Error:", error);
    }
  };

  useEffect(() => {
    fetchAllFooters();
  }, []);

  return (
    <footer className="text-neutral-700 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Team Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Our Team</h3>
            <ul className="space-y-2">
              {loading ? (
                <Loading />
              ) : footer.length > 0 ? (
                footer.map((item, index) => (
                  <li key={index}>
                    <Link to={item.link || "#"} className="hover:text-blue-400">
                      {item.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li>No team members found.</li>
              )}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              {loading ? (
                <Loading />
              ) : (
                <>
                  {footer.map((item, index) => (
                    <Link to="#" className="hover:text-blue-400 w-[40px] p-1 h-[40px] hover:bg-slate-300 rounded-full" key={index}>
                      <img
                        src={item.icon}
                        className="w-[40px] h-auto hover:bg-slate-500 rounded-full "
                        alt={item.name}
                      />
                    </Link>
                  ))}
                </>
              )}
            </div>
          </div>

          {/* Copyright */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Copyright</h3>
            <p>
              &copy; {new Date().getFullYear()} {footer[0]?.copy_right} ❤️❤️ . All rights
              reserved.
            </p>
          </div>
        </div>

        {/* Bottom Divider */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p>Designed with ❤️ by  {footer[0]?.copy_right} ❤️❤️</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
