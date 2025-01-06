const ImageGrid = () => {
  const images = [
    // Replace these URLs with your actual image sources
    { src: "/images/model-gallery/getimg_ai_img-0TJcYIvAsnPLH3nEMxiOX.jpeg", alt: "Image 1" },
    { src: "/images/model-gallery/getimg_ai_img-1q3dXIl8hj7rpd0p323vu.jpeg", alt: "Image 2" },
    { src: "/images/model-gallery/getimg_ai_img-2dLJgir45g4JULV48nRy9.jpeg", alt: "Image 3" },
    { src: "/images/model-gallery/getimg_ai_img-4BOumNv2sxEm2z8ePMFNb.jpeg", alt: "Image 4" },
    { src: "/images/model-gallery/getimg_ai_img-4u7qKNo0KPwUVN2HCxtUV.jpeg", alt: "Image 5" },
    { src: "/images/model-gallery/getimg_ai_img-5hP1KqLe4bqKuufBhZfEv.jpeg", alt: "Image 6" },
    { src: "/images/model-gallery/getimg_ai_img-2LuGKyxjYnuXThjWTabZ5.jpeg", alt: "Image 7" },
    { src: "/images/model-gallery/getimg_ai_img-5V5fKiMdAjG2zwwmUFXPO.jpeg", alt: "Image 8" },
    { src: "/images/model-gallery/getimg_ai_img-7BxvLDHU6Gw1fjusT2qYh.jpeg", alt: "Image 9" },
    { src: "/images/model-gallery/getimg_ai_img-7sUPVbA6z33Pq3eRfTSSe.jpeg", alt: "Image 10" },
    { src: "/images/model-gallery/getimg_ai_img-Ec8Wd4kmnZZSnxOYEtrxO.jpeg", alt: "Image 11" },
    { src: "/images/model-gallery/getimg_ai_img-CPju632voVEmTDM37Iesi.jpeg", alt: "Image 12" },
    { src: "/images/model-gallery/getimg_ai_img-CPju632voVEmTDM37Iesi.jpeg", alt: "Image 13" },
    { src: "/images/model-gallery/img-u2D6ZV51wIFe7hljWA5qN.jpeg", alt: "Image 14" },
    { src: "/images/model-gallery/getimg_ai_img-ziZ7djg3nxQ4hRvaGZeYB.jpeg", alt: "Image 15" },
    { src: "/images/model-gallery/getimg_ai_img-ZEPACeozUJyNcuctTaf8V.jpeg", alt: "Image 16" },
    { src: "/images/model-gallery/getimg_ai_img-z0f5anJkmiX0QZkGwKXDE.jpeg", alt: "Image 17" },
    { src: "/images/model-gallery/getimg_ai_img-yTpUWJAKa4oXltcWKx701.jpeg", alt: "Image 18" },
    { src: "/images/model-gallery/getimg_ai_img-YBnuCV3rTPdjEg1cDJLsU.jpeg", alt: "Image 19" },
    { src: "/images/model-gallery/getimg_ai_img-xvjjgwod29U2WcxJMLQE3.jpeg", alt: "Image 20" },
    { src: "/images/model-gallery/getimg_ai_img-wRMnEucCSIkD57XOUx0QB.jpeg", alt: "Image 21" },
    { src: "/images/model-gallery/getimg_ai_img-WiyEuLrwnxiDvnry8GgOR.jpeg", alt: "Image 22" },
    { src: "/images/model-gallery/getimg_ai_img-Vhn90Zmwxi5EfvbECxCRk.jpeg", alt: "Image 23" },
    { src: "/images/model-gallery/getimg_ai_img-VfuPdHxX3cTndWvd8iv0S.jpeg", alt: "Image 24" },
    { src: "/images/model-gallery/getimg_ai_img-Ur59Eheh1KYDPD7Qnywwo.jpeg", alt: "Image 25" },
    { src: "/images/model-gallery/getimg_ai_img-uoxVI3cbya1sq8KfUxOWw.jpeg", alt: "Image 26" },
    { src: "/images/model-gallery/getimg_ai_img-umzDBqTGDenf2eCYSq8QS.jpeg", alt: "Image 27" },
    { src: "/images/model-gallery/getimg_ai_img-u2kY801mtzd3vbPxvcigU.jpeg", alt: "Image 28" },
    { src: "/images/model-gallery/getimg_ai_img-U1NF1p7DS7jhcHZm5nfd4.jpeg", alt: "Image 29" },
    { src: "/images/model-gallery/getimg_ai_img-tXykuPsdhs1QFtDuxFJl9.jpeg", alt: "Image 30" },
    { src: "/images/model-gallery/getimg_ai_img-TmLfWm7eW7giZF1ekcpcC.jpeg", alt: "Image 31" },
    { src: "/images/model-gallery/getimg_ai_img-Tf8TWE96xIpkSfnPxd2ob.jpeg", alt: "Image 32" },
    { src: "/images/model-gallery/getimg_ai_img-Taf5ruSeCNXMAubtaSG0p.jpeg", alt: "Image 33" },
    { src: "/images/model-gallery/getimg_ai_img-SvKsXHX7uVqmidggxvFkM.jpeg", alt: "Image 34" },
    { src: "/images/model-gallery/getimg_ai_img-rMl65unm35acSYM0kk9W5.jpeg", alt: "Image 35" },
    { src: "/images/model-gallery/getimg_ai_img-R6eZ7lO3ZxBatuNRtMizt.jpeg", alt: "Image 36" },
    { src: "/images/model-gallery/getimg_ai_img-qBuNy8gynXPDUJUeXblt2.jpeg", alt: "Image 37" },
    { src: "/images/model-gallery/getimg_ai_img-POo5XRoLw6sHYgm9QfxDo.jpeg", alt: "Image 38" },
    { src: "/images/model-gallery/getimg_ai_img-pfN4cl2LCbpaZ3a3dvioD.jpeg", alt: "Image 39" },
    { src: "/images/model-gallery/getimg_ai_img-pcILiTpZISMr3ZwohG5Se.jpeg", alt: "Image 40" },
    { src: "/images/model-gallery/getimg_ai_img-oBzkFMfvtpZtvz6BjNs3X.jpeg", alt: "Image 41" },
    { src: "/images/model-gallery/getimg_ai_img-oBYll7DkAoXHhxl9ckD1n.jpeg", alt: "Image 42" },
    { src: "/images/model-gallery/getimg_ai_img-NZebKa53YfZNQSyYftWc3.jpeg", alt: "Image 43" },
    { src: "/images/model-gallery/getimg_ai_img-NWm8CjQ6VvXZ4YOxNtNvO.jpeg", alt: "Image 44" },
    { src: "/images/model-gallery/getimg_ai_img-n5ffv69x7Iq7d3S1j4EWQ.jpeg", alt: "Image 45" },
    { src: "/images/model-gallery/getimg_ai_img-MvDuTzaZqyiKTanlW3yEe.jpeg", alt: "Image 46" },
    { src: "/images/model-gallery/getimg_ai_img-MD7SQsCSqsYZ7iWbEo1w1.jpeg", alt: "Image 47" },
    { src: "/images/model-gallery/getimg_ai_img-M2WGC27INlJgf2opZf3rU.jpeg", alt: "Image 48" },
    { src: "/images/model-gallery/getimg_ai_img-Lxq8UhozeXj5rw4wjZAf6.jpeg", alt: "Image 49" },
    { src: "/images/model-gallery/getimg_ai_img-LUoodnIVyKt3pYidg6J8w.jpeg", alt: "Image 50" },
    { src: "/images/model-gallery/getimg_ai_img-LtmG4Pa40A7cCEg0T6AvY.jpeg", alt: "Image 51" },
    { src: "/images/model-gallery/getimg_ai_img-l6m6OYz0HKspe8h4EdY1F.jpeg", alt: "Image 52" },
    { src: "/images/model-gallery/getimg_ai_img-KUGJ6ksvpuWLEHSAHW4KE.jpeg", alt: "Image 53" },
    { src: "/images/model-gallery/getimg_ai_img-kHxzlQF1bWtNIOvxK0g0f.jpeg", alt: "Image 54" },
    { src: "/images/model-gallery/getimg_ai_img-k4XCJER74oH7ldwueEt36.jpeg", alt: "Image 55" },
    { src: "/images/model-gallery/getimg_ai_img-k4e9aHlFuXN1Iany4WWtE.jpeg", alt: "Image 57" },
    { src: "/images/model-gallery/getimg_ai_img-julqFbLDRUM4fl3d8Ghyk.jpeg", alt: "Image 58" },
    { src: "/images/model-gallery/getimg_ai_img-jTPd9JMKPA1sLtVcs0GfD.jpeg", alt: "Image 59" },
    { src: "/images/model-gallery/getimg_ai_img-iLTqK1s4oalk9bzizP9mr.jpeg", alt: "Image 60" },
    { src: "/images/model-gallery/getimg_ai_img-IGpBTw2JbGxYCNERlm7ar.jpeg", alt: "Image 61" },
    // { src: "/images/model-gallery/getimg_ai_img-CPju632voVEmTDM37Iesi.jpeg", alt: "Image 20" },
  ];

  return (
    <div className="bg-black min-h-screen p-5">
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative bg-gray-800 rounded-lg overflow-hidden group"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transform transition duration-300 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;
