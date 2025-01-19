import { useState, useEffect } from "react";
import { useParams, useNavigate, redirect } from "react-router-dom";
import customAPI from "./../api";
import Loading from "./../components/Loading";
import FormInput from "./../components/Form/FormInput";
import FormSelect from "./../components/Form/FormSelect";
import FormTextArea from "./../components/Form/FormTextArea";
import { toast } from "react-toastify";
import { Categories } from "./../utils/Categories";

export const loader = (store) => async () => {
  const user = store.getState().userState?.user;
  if (!user) {
    toast.error("Anda harus login terlebih dahulu");
    return redirect("/login");
  }
  if (user.role !== "admin") {
    toast.error("Anda bukan admin, anda tidak dapat mengedit produk");
    return redirect("/");
  }
  return null;
};

const EditProduct = () => {
  const categories = Categories;
  console.log(categories);

  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [imageType, setImageType] = useState("file"); // Default ke file
  const [imageUrl, setImageUrl] = useState(""); // URL gambar jika dipilih

  const getProduct = async () => {
    const { data } = await customAPI.get(`/product/${id}`);
    setProduct(data.data);
    setImageUrl(data.data.image); // Set default image URL
  };

  const submitData = async (e) => {
    e.preventDefault();
    const form = e.target;
    const dataForm = new FormData(form);

    const data = Object.fromEntries(dataForm);
    console.log(data);

    try {
      let finalImage;

      if (imageType === "file") {
        // Jika input berupa file, upload gambar
        const resFile = await customAPI.post("/product/upload", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        finalImage = resFile.data.image; // URL dari file yang diunggah
      } else {
        // Jika input berupa URL, gunakan langsung
        finalImage = imageUrl;
      }

      // Update produk dengan data baru
      await customAPI.put(`/product/${id}`, {
        name: data.name,
        price: data.price,
        stock: data.stock,
        description: data.description,
        category: data.category,
        image: finalImage, // URL gambar
      });

      toast.success("Produk berhasil diperbarui");
      navigate("/products");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      {product ? (
        <form onSubmit={submitData} encType="multipart/form-data">
          {/* Pilihan input gambar */}
          <div className="form-control mb-4">
            <label className="label cursor-pointer">
              <span className="label-text">Upload Gambar</span>
              <input
                type="radio"
                name="imageType"
                value="file"
                checked={imageType === "file"}
                onChange={() => setImageType("file")}
                className="radio radio-primary"
              />
            </label>
            <label className="label cursor-pointer">
              <span className="label-text">URL Gambar</span>
              <input
                type="radio"
                name="imageType"
                value="url"
                checked={imageType === "url"}
                onChange={() => setImageType("url")}
                className="radio radio-primary"
              />
            </label>
          </div>

          {/* Input gambar berdasarkan pilihan */}
          {imageType === "file" ? (
            <label className="form-control mb-4">
              <span className="label-text">Upload File</span>
              <input
                type="file"
                name="image"
                accept="image/jpeg, image/png, image/jpg"
                className="file-input file-input-bordered file-input-primary w-full max-w-xs"
              />
            </label>
          ) : (
            <FormInput
              type="url"
              name="imageUrl"
              label="Masukkan URL Gambar"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required={imageType === "url"}
            />
          )}

          <FormSelect
            name="category"
            label="Pilih Category"
            list={categories}
            defaultValue={product.category}
          />
          <FormInput
            type="text"
            name="name"
            label="Nama Produk"
            defaultValue={product.name}
          />
          <FormInput
            type="number"
            name="price"
            label="Harga Produk"
            defaultValue={product.price}
          />
          <FormInput
            type="number"
            name="stock"
            label="Stok Produk"
            defaultValue={product.stock}
          />
          <FormTextArea
            name="description"
            label="Deskripsi Produk"
            defaultValue={product.description}
          />
          <input
            type="submit"
            className="btn btn-primary btn-block mt-5 btn-md"
            value="Edit Produk"
          />
        </form>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default EditProduct;
