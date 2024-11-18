import z from "zod"


export const candidateSchema = z.object({
    name: z.string().min(1, "Nama kandidat harus diisi"),
    vision: z.string().min(10, "Visi minimal 10 karakter").max(500, "Visi maksimal 500 karakter"),
    mission: z.string().min(10, "Misi minimal 10 karakter").max(1000, "Misi maksimal 1000 karakter"),
    photo: z.instanceof(File).optional().refine(
      (file) => !file || (file.size <= 5000000 && ['image/jpeg', 'image/png'].includes(file.type)),
      "Foto harus berformat JPG atau PNG dan ukuran maksimal 5MB"
    ),
  })
  
 export const formVoteSchema = z.object({
    title: z.string().min(1, "Judul voting harus diisi"),
    dateRange: z.object({
        from: z.date(),
        to: z.date(),
      }),
      isPublished : z.boolean().default(false),
    candidates: z.array(candidateSchema).min(2, "Minimal harus ada 2 kandidat"),
  })


  
export type FormVoteValues = z.infer<typeof formVoteSchema>





export const candidateEditSchema = z.object({
    name: z.string().min(1, "Nama kandidat harus diisi"),
    vision: z.string().min(10, "Visi minimal 10 karakter").max(500, "Visi maksimal 500 karakter"),
    mission: z.string().min(10, "Misi minimal 10 karakter").max(1000, "Misi maksimal 1000 karakter"),

    photo: z.instanceof(File).optional().refine(
      (file) => !file || (file.size <= 5000000 && ['image/jpeg', 'image/png'].includes(file.type)),
      "Foto harus berformat JPG atau PNG dan ukuran maksimal 5MB"
    ),
  })
  
 export const formVoteEditSchema = z.object({
    title: z.string().min(1, "Judul voting harus diisi"),
    code : z.string().min(6, "Kode voting harus diisi"),
    dateRange: z.object({
        from: z.date(),
        to: z.date(),
      }),
    candidates: z.array(candidateEditSchema).min(1, "Minimal harus ada 1 kandidat"),
  })


  export type FormVoteEditValues = z.infer<typeof formVoteEditSchema>