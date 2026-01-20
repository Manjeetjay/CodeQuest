import Navbar from "./components/Navbar";

export default function Landing() {
  return (
    <div className="bg-gray-950">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <section className="text-center">
          <h1 className="text-5xl font-bold mb-6 text-white">
            A New Way to Practice <span className="text-blue-500">Coding</span>
          </h1>

          <p className="text-gray-300 text-lg mb-10">
            Solve problems. Compete globally. Prepare for interviews.
          </p>

          <div className="flex justify-center gap-4">
            <a
              href="/problems"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-950"
            >
              Start Coding
            </a>

            <a
              href="/login"
              className="text-white border px-6 py-3 rounded-lg text-lg hover:bg-gray-100"
            >
              Sign In
            </a>
          </div>
        </section>


        {/* Features */}
        <section className="text-white grid grid-cols-1 md:grid-cols-3 gap-10 mt-33">
          <Feature
            title="Structured Problems"
            desc="DSA problems categorized by difficulty and topic."
          />
          <Feature
            title="Real-time Rankings"
            desc="Compete and track your progress globally."
          />
          <Feature
            title="Interview Ready"
            desc="Problems asked by top tech companies."
          />
        </section>
      </main>
    </div>
  );
}

function Feature({ title, desc }) {
  return (
    <div className="p-6 border rounded-xl hover:shadow-md transition">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-200">{desc}</p>
    </div>
  );
}
