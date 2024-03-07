import { Link } from "react-router-dom";
import Card from "../components/Card"

function About() {
  return (
    <Card>
        <div className="about-wrapper">
            <h1>Welcome to Comment App!</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae velit laboriosam aperiam sunt porro quidem, earum voluptatem tenetur? Necessitatibus architecto officiis dolor rem libero inventore eos consequatur illum rerum voluptate eaque, repellendus, ea dolore! Aspernatur eaque impedit cumque? Officia, sequi incidunt mollitia expedita dolorum distinctio obcaecati voluptatibus dignissimos dicta dolorem et iure. Dignissimos neque, repellat voluptatum quibusdam expedita velit illum ea asperiores culpa in nam quaerat iusto, distinctio ipsa ab assumenda nesciunt. Neque tenetur quisquam laboriosam temporibus quaerat cumque quibusdam omnis iusto nostrum molestias illum, sapiente, dolores culpa maiores adipisci numquam amet optio! Magnam, facilis inventore laborum esse sunt, voluptatibus eum adipisci saepe, neque totam ex tempora. Molestiae, consequatur error reprehenderit itaque numquam laborum quae, totam vitae incidunt aspernatur, ea non est repellat saepe omnis? Itaque pariatur earum et quae exercitationem optio nam saepe suscipit ex possimus autem aliquid sequi officiis doloribus, deserunt tempore! Atque dolorum nihil nobis unde cupiditate!</p>
            <Link
                to='/'
                className="back-to-home-link">
                    Back to Home Page
            </Link>
        </div>
    </Card>
  )
}

export default About