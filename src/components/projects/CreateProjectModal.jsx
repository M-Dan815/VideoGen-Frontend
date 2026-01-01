import React, {useState} from "react";
import {FolderPlus} from "lucide-react";
import {Modal} from "@components/ui/Modal";
import {Input} from "@components/ui/Input";
import {Button} from "@components/ui/Button";

export const CreateProjectModal = ({isOpen, onClose, onCreate}) => {
	const [name, setName] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await onCreate(name || undefined);
			setName("");
			onClose();
		} catch (err) {
			// Error handled in hook
		} finally {
			setLoading(false);
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title="Create New Project"
			size="md"
		>
			<form onSubmit={handleSubmit} className="space-y-6">
				<Input
					label="Project Name (Optional)"
					placeholder="Enter project name or leave empty for auto-generated"
					value={name}
					onChange={(e) => setName(e.target.value)}
					icon={FolderPlus}
				/>

				<div className="flex justify-end gap-3">
					<Button variant="ghost" type="button" onClick={onClose}>
						Cancel
					</Button>
					<Button type="submit" loading={loading}>
						Create Project
					</Button>
				</div>
			</form>
		</Modal>
	);
};
