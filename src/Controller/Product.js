import Product from "../Model/ProductModel.js";

const getProduct = async (req, res) => {
  const product = await Product.find();
  res.send(product);
};

const updateProduct = async (req, res) => {
  const productId = req.params.id;
  console.log("id product:", productId);
  const product = await Product.findById(productId);
  if (product) {
    product.name = req.body.name;
    product.slug = req.body.slug;
    product.price = req.body.price;
    product.image = req.body.image;
    product.category = req.body.category;
    product.brand = req.body.brand;
    product.countInStock = req.body.countInStock;
    product.description = req.body.description;

    await product.save();
    res.send({ message: "Update successfully" });
  } else {
    res.status(404).send({ message: "Product not found" });
  }
};

const CreateProduct = async (req, res) => {
  const newProduct = new Product({
    // name: "sample name " + Date.now(),
    // slug: "sample-name-" + Date.now(),
    // image: "/images/p1.jpg",
    // price: 0,
    // category: "sample category",
    // brand: "sample brand",
    // countInStock: 0,
    // rating: 0,
    // numReviews: 0,
    // description: "sample description",
    name: req.body.name + Date.now(),
    slug: req.body.slug + Date.now(),
    image: "/images/p1.jpg",
    price: req.body.price,
    category: "sample category",
    brand: "sample brand",
    countInStock: 0,
    rating: 0,
    numReviews: 0,
    description: req.body.description,
  });
  const product = await newProduct.save();
  res.send({ message: "Product created successfully", product });
};

export { getProduct, updateProduct, CreateProduct };
