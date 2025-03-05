'use client';

import { setHeaderLinks, setMobileMenuLinks } from "@/actions";
import type { ILink } from "@/api/value";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { useHeaderLinks } from "@/hooks/useHeaderLinks";
import { useMobileMenuLinks } from "@/hooks/useMobileMenuLinks";
import { normalizeUrl } from "@/utils";
import { BiPlus } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";

function LinkEditor({
	link,
	onChange,
	onDelete,
}: {
	link: ILink,
	onChange: (link: ILink) => void,
	onDelete: () => void,
}) {
	return (
		<div className="grid grid-cols-subgrid gap-2 col-span-full">
			<Input
				placeholder="Подпись"
				value={link.text}
				onChange={e => onChange({ ...link, text: e.currentTarget.value })}/>
			<Input
				placeholder="Ссылка"
				value={link.href}
				onChange={e => onChange({ ...link, href: normalizeUrl(e.currentTarget.value) })}/>
			<Button className="w-8 h-8" onClick={onDelete}>
				<RxCross2 color="red"/>
			</Button>
		</div>
	)
}

function LinksEditor({
	title,
	links,
	onChange,
	onSave,
}: {
	title: string,
	links: ILink[],
	onChange: (links: ILink[]) => void,
	onSave: () => void,
}) {
	const onAdd = () => onChange(links.concat({ href: '', text: '' }));

	return (
		<div className="mb-6 grid grid-cols-[1fr_1fr_auto] gap-2">
			<div className="text-xl mb-1 col-span-full">{title}</div>
			{
				links.map((link, i) => (
					<LinkEditor
						key={i}
						link={link}
						onChange={link => onChange(links.toSpliced(i, 1, link))}
						onDelete={() => onChange(links.toSpliced(i, 1))}/>
				))
			}
			<div className="col-span-full flex justify-between">
				<Button intent="primary" className="w-fit" onClick={onSave}>
					Сохранить
				</Button>
				<Button intent="secondary" className="w-8 h-8" onClick={onAdd}>
					<BiPlus color="springGreen"/>
				</Button>
			</div>
		</div>
	)
}

export default function LinksPage() {
	const { data: headerLinks, mutate: mutateHeaderLinks } = useHeaderLinks();
	const { data: mobileMenuLinks, mutate: mutateMobileMenuLinks } = useMobileMenuLinks();

	const onSaveHeaderLinks = () => {
		if(!headerLinks) return;
		setHeaderLinks(headerLinks);
	}

	const onSaveMobileMenuLink = () => {
		if(!mobileMenuLinks) return;
		setMobileMenuLinks(mobileMenuLinks);
	}

	return (
		<div className="text-text p-2">
			<LinksEditor
				title="Ссылки в шапке"
				onSave={onSaveHeaderLinks}
				links={headerLinks ?? []}
				onChange={links => mutateHeaderLinks(links, false)}/>
			<LinksEditor
				title="Ссылки в мобильном меню"
				onSave={onSaveMobileMenuLink}
				links={mobileMenuLinks ?? []}
				onChange={links => mutateMobileMenuLinks(links, false)}/>
		</div>
	)
}