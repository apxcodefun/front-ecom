import React, { useState } from "react";
import FormTextArea from "./../components/Form/FormTextArea";
import FormInput from "./../components/Form/FormInput";
import FormSelect from "./../components/Form/FormSelect";
import customAPI from "./../api";
import { toast } from "react-toastify";
import { useNavigate, redirect } from "react-router-dom";

export const loader = (store) => async () => {
  const user = store.getState().userState?.user;
  if (!user) {
    toast.error("Anda harus login terlebih dahulu");
    return redirect("/login");
  }
  if (user.role !== "admin") {
    toast.error("Anda bukan admin, anda tidak dapat membuat produk");
    return redirect("/");
  }
  return null;
};

const CreateProduct = () => {
  const categories = ["sepatu", "baju", "kemeja", "celana", "handphone"];
  const [imageType, setImageType] = useState("file"); // State untuk memilih jenis input
  const navigate = useNavigate();

  const submitData = async (e) => {
    e.preventDefault(); // Supaya nggak reload halaman ketika form di-submit
    const form = e.target;
    const dataForm = new FormData(form); // Mengambil data dari form

    // Convert FormData menjadi object biasa
    const data = Object.fromEntries(dataForm);
    console.log(data);

    try {
      let imageUrl;

      if (imageType === "file") {
        // Upload file jika jenis input adalah file
        const resFile = await customAPI.post(
          "/product/upload",
          data, // Kirim FormData langsung
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        imageUrl = resFile.data.image; // URL gambar dari respons upload
      } else {
        // Ambil URL langsung dari input jika jenis input adalah URL
        imageUrl = data.imageUrl;
      }

      // Kirim data produk ke server
      await customAPI.post("/product", {
        name: data.name,
        price: data.price,
        stock: data.stock,
        description: data.description,
        category: data.category,
        image: imageUrl, // Gunakan URL dari upload atau input
      });

      toast.success("Product berhasil ditambahkan");
      navigate("/products");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  };

  return (
    <form onSubmit={submitData} encType="multipart/form-data">
      {/* Pilihan input file atau URL */}
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

      {/* Input gambar berdasarkan jenis yang dipilih */}
      {imageType === "file" ? (
        <label className="form-control mb-4">
          <span className="label-text">Upload File</span>
          <input
            type="file"
            name="image"
            accept="image/*"
            required={imageType === "file"}
            className="file-input file-input-bordered file-input-primary w-full max-w-xs"
          />
        </label>
      ) : (
        <FormInput
          type="url"
          name="imageUrl"
          label="Masukkan URL Gambar"
          required={imageType === "url"}
        />
      )}

      {/* Input lainnya */}
      <FormSelect name="category" label="Pilih Category" list={categories} />
      <FormInput type="text" name="name" label="Nama Produk" />
      <FormInput type="number" name="price" label="Harga Produk" />
      <FormInput type="number" name="stock" label="Stok Produk" />
      <FormTextArea name="description" label="Deskripsi Produk" />

      <input
        type="submit"
        className="btn btn-primary btn-block mt-5 btn-md"
        value="Tambah"
      />
    </form>
  );
};

export default CreateProduct;
