import React, {useCallback, useState} from "react";
import {useDropzone} from "react-dropzone";
import {Upload, X, Image as ImageIcon, Check} from "lucide-react";
import {Button} from "@components/ui/Button";
import {ProgressBar} from "@components/ui/ProgressBar";

export const ImageUploader = ({onUpload, maxFiles = 10}) => {
	const [files, setFiles] = useState([]);
	const [uploading, setUploading] = useState(false);
	const [uploadProgress, setUploadProgress] = useState({});
	const [uploadedFiles, setUploadedFiles] = useState([]);

	const onDrop = useCallback(
		(acceptedFiles) => {
			const newFiles = acceptedFiles.slice(0, maxFiles - files.length);
			const filesWithPreview = newFiles.map((file) => ({
				file,
				id: Math.random().toString(36).substr(2, 9),
				preview: URL.createObjectURL(file),
			}));
			setFiles((prev) => [...prev, ...filesWithPreview]);
		},
		[files, maxFiles]
	);

	const {getRootProps, getInputProps, isDragActive} = useDropzone({
		onDrop,
		accept: {
			"image/jpeg": [".jpg", ".jpeg"],
			"image/png": [".png"],
			"image/webp": [".webp"],
		},
		maxFiles,
		disabled: uploading,
	});

	const removeFile = (fileId) => {
		setFiles((prev) => prev.filter((f) => f.id !== fileId));
	};

	const handleUpload = async () => {
		if (files.length === 0) return;

		setUploading(true);
		const uploaded = [];

		for (const fileData of files) {
			try {
				setUploadProgress((prev) => ({...prev, [fileData.id]: 0}));

				const result = await onUpload(fileData.file, (progress) => {
					setUploadProgress((prev) => ({...prev, [fileData.id]: progress}));
				});

				uploaded.push(fileData.id);
				setUploadedFiles((prev) => [...prev, fileData.id]);
			} catch (err) {
				console.error("Upload failed:", err);
			}
		}

		// Clear uploaded files after success
		setTimeout(() => {
			setFiles((prev) => prev.filter((f) => !uploaded.includes(f.id)));
			setUploadProgress({});
			setUploadedFiles([]);
			setUploading(false);
		}, 1000);
	};

	return (
		<div className="space-y-4">
			{/* Dropzone */}
			<div
				{...getRootProps()}
				className={`
          relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer
          transition-all duration-300
          ${
						isDragActive
							? "border-yellow-400 bg-yellow-400/10"
							: "border-gray-600 hover:border-gray-500 bg-gray-800/50"
					}
          ${uploading ? "pointer-events-none opacity-50" : ""}
        `}
			>
				<input {...getInputProps()} />
				<div className="flex flex-col items-center">
					<div className="w-16 h-16 rounded-2xl bg-gray-700 flex items-center justify-center mb-4">
						<Upload
							className={`w-8 h-8 ${
								isDragActive ? "text-yellow-400" : "text-gray-400"
							}`}
						/>
					</div>
					<p className="text-white font-medium mb-1">
						{isDragActive ? "Drop images here" : "Drag & drop images here"}
					</p>
					<p className="text-gray-400 text-sm">
						or click to select files (max {maxFiles} images)
					</p>
					<p className="text-gray-500 text-xs mt-2">
						Supports: JPEG, PNG, WebP
					</p>
				</div>
			</div>

			{/* File Preview Grid */}
			{files.length > 0 && (
				<div className="space-y-4">
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
						{files.map((fileData) => (
							<div
								key={fileData.id}
								className="relative group aspect-square rounded-xl overflow-hidden bg-gray-800"
							>
								<img
									src={fileData.preview}
									alt={fileData.file.name}
									className="w-full h-full object-cover"
								/>

								{/* Progress Overlay */}
								{uploading && uploadProgress[fileData.id] !== undefined && (
									<div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center">
										{uploadedFiles.includes(fileData.id) ? (
											<Check className="w-8 h-8 text-green-400" />
										) : (
											<>
												<div className="w-3/4 mb-2">
													<ProgressBar
														value={uploadProgress[fileData.id]}
														showLabel={false}
														size="sm"
													/>
												</div>
												<span className="text-white text-sm">
													{uploadProgress[fileData.id]}%
												</span>
											</>
										)}
									</div>
								)}

								{/* Remove Button */}
								{!uploading && (
									<button
										onClick={() => removeFile(fileData.id)}
										className="absolute top-2 right-2 w-8 h-8 bg-black/50 hover:bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
									>
										<X className="w-4 h-4 text-white" />
									</button>
								)}

								{/* File Name */}
								<div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
									<p className="text-white text-xs truncate">
										{fileData.file.name}
									</p>
								</div>
							</div>
						))}
					</div>

					{/* Upload Button */}
					<div className="flex justify-end">
						<Button
							onClick={handleUpload}
							loading={uploading}
							disabled={files.length === 0}
							icon={Upload}
						>
							Upload {files.length} Image{files.length > 1 ? "s" : ""}
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};
