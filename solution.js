import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
let posts = [
  {
    id: 1,
    title: "Navigating the Unknown: My First Day in College",
    content:
      "The butterflies in my stomach seemed to have taken residence as I stepped onto the college campus on that crisp, sunny morning. The air was charged with a mix of excitement and nervousness, a feeling shared by every freshman around me. The sprawling campus seemed like a maze of buildings and pathways, and I couldn't help but wonder how I would find my way around. My first college day was a rollercoaster of emotions, from the thrill of independence to the challenge of making new friends and adapting to a whole new academic environment. As I attended my first lectures and explored the campus, I realized that this was the beginning of a transformative journey—one that promised personal growth and unforgettable experiences.",
    author: "Sai Harshith Tule",
    date: "2021-12-01T10:00:00Z",
  },
  {
    id: 2,
    title: "From High School Hallways to College Corridors: A Freshman's Perspective",
    content:
      "Leaving the familiar hallways of high school behind, I found myself in a sea of unfamiliar faces and a campus that seemed to stretch into infinity. The transition from high school to college was both exhilarating and overwhelming. The classes were more demanding, the expectations higher, but with that came the freedom to choose my own path. The first day was a whirlwind of introductions, syllabi, and campus tours. Navigating the college corridors felt like stepping into a new world—one where I was not just a student, but an independent learner ready to explore the vast ocean of knowledge that awaited me. As I walked through those corridors, I couldn't help but feel a sense of anticipation for the intellectual adventures that lay ahead.",
    author: "Sai Harshith Tule",
    date: "2021-12-02T14:30:00Z",
  },
  {
    id: 3,
    title: "Finding My Tribe: The Quest for Connection on Day One",
    content:
      "Entering college was not just a leap into academia but a plunge into a social landscape filled with diverse personalities. The first day was a challenge to break out of my comfort zone and connect with fellow students. The campus buzzed with activity, and amidst the sea of faces, I sought those with whom I could share the next chapter of my life. From orientation sessions to spontaneous conversations in the cafeteria, I discovered that everyone was eager to forge new friendships. As I navigated the intricate web of social dynamics, I realized that finding my tribe was not just about shared interests but also about embracing the rich tapestry of backgrounds and perspectives that defined my college community. The first day was not just about classes; it was about building connections that would last a lifetime.",
    author: "Sai Harshith Tule",
    date: "2021-12-03T09:15:00Z",
  },
  {
    id: 3,
    title: "The Chronicles of a Freshman: Lessons Learned on Day One",
    content:
      "As the sun dipped below the horizon on my inaugural day in college, I found myself reflecting on the invaluable lessons the experience had already imparted. From the importance of time management to the art of balancing newfound freedom with responsibility, every moment seemed to carry a nugget of wisdom. The realization that I was not alone in feeling a bit lost and overwhelmed was oddly comforting. The professors, with their wealth of knowledge, became beacons of guidance, and the senior students, once freshmen themselves, offered insights that transcended textbooks. My first day wasn't just an introduction to syllabi and lecture halls; it was an initiation into the world of higher education, demanding not just academic prowess but a keen sense of self-discovery and adaptability. Each encounter, each interaction, became a brushstroke in the canvas of my college journey, painting a picture of growth and resilience.",
    author: "Sai Harshith Tule",
    date: "2021-12-03T09:15:00Z",
  },
];

let lastId = 3;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// GET all posts
app.get("/posts", (req, res) => {
  console.log(posts);
  res.json(posts);
});

// GET a specific post by id
app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});

// POST a new post
app.post("/posts", (req, res) => {
  const newId = lastId += 1;
  const post = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date(),
  };
  lastId = newId;
  posts.push(post);
  res.status(201).json(post);
});

// PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });

  if (req.body.title) post.title = req.body.title;
  if (req.body.content) post.content = req.body.content;
  if (req.body.author) post.author = req.body.author;

  res.json(post);
});

// DELETE a specific post by providing the post id
app.delete("/posts/:id", (req, res) => {
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Post not found" });

  posts.splice(index, 1);
  res.json({ message: "Post deleted" });
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
