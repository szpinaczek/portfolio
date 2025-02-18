import React, { useMemo } from 'react';

import { Heading, Flex, Text, Button, Avatar, RevealFx, Arrow, Column, GlitchFx, LetterFx } from '@/once-ui/components';
import { Projects } from '@/components/work/Projects';

import { baseURL, routes } from '@/app/resources';
import { home, about, person, newsletter } from '@/app/resources/content';
import { Mailchimp } from '@/components';
import { Posts } from '@/components/blog/Posts';
import styles from "@/components/Earth.module.scss";
import ParticlesSetup from '@/components/Particles';

import { Earth } from '@/components/Earth';
import { EarthDescText } from '@/datasets/texts';
import TypeAnimationComponent from '@/components/TypeAnimation';
import classNames from 'classnames';
import Ufo from '@/components/3D/Ufo';
import { Canvas } from '@react-three/fiber';

export async function generateMetadata() {
	const title = home.title;
	const description = home.description;
	const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'website',
			url: `https://${baseURL}`,
			images: [
				{
					url: ogImage,
					alt: title,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [ogImage],
		},
	};
}

const sequence = [EarthDescText, 3000];

// const codePoints: number[] = [
//     0x1401, 0x1402, 0x1403, 0x1404, 0x1405, 0x1406, 0x1407, 0x1408, 0x1409,
//     0x140a, 0x140b, 0x140c, 0x140d, 0x140e, 0x140f, 0x1450, 0x1451, 0x1452,
//     0x1453, 0x1454, 0x1455, 0x1456, 0x1457, 0x1458, 0x1459, 0x142b, 0x142c,
//     0x142d, 0x142e, 0x142f, 0x1410, 0x1441, 0x1442, 0x1443, 0x1444, 0x1445,
//     0x1446, 0x1447, 0x1448,
//   ];

export default function Home() {
	return (
		// <GlitchFx
		// 			// fillWidth 
		// 			speed="slow"
		// 			interval={2500}
		// 			continuous={false}
		// 			maxWidth="m"
		// 		>
		// <RevealFx
		// 	// translateY="8" delay={1} fillWidth justifyContent="center" paddingBottom="m"
		// 	speed="medium"
		// 	delay={0.8}
		// 	translateY={0}
		// >
		<Column
			maxWidth="m" gap="xl"
			alignItems="center">
			<script
				type="application/ld+json"
				suppressHydrationWarning
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'WebPage',
						name: home.title,
						description: home.description,
						url: `https://${baseURL}`,
						image: `${baseURL}/og?title=${encodeURIComponent(home.title)}`,
						publisher: {
							'@type': 'Person',
							name: person.name,
							image: {
								'@type': 'ImageObject',
								url: `${baseURL}${person.avatar}`,
							},
						},
					}),
				}}
			/>
			<ParticlesSetup />
			<RevealFx
				// translateY="8" delay={1} fillWidth justifyContent="center" paddingBottom="m"
				speed="medium"
				delay={0.5}
				translateY={0}
			>
				{/* <Column
					// maxWidth="s"
					> */}

				<Earth />
				{/* <Flex
						justifyContent="flex-start"
						alignItems="center"
						className={styles.earth}
					>
						<Text
							wrap="balance" onSolid="neutral-weak"
							variant="heading-default-m">
							Data Container
						</Text>
					</Flex> */}
				{/* </Column> */}
				<Flex flex={1}
					paddingLeft="l"
					alignItems="center"
				// className={classNames('font-text font-l')}
				>
					{/* <RevealFx
						translateY="0" delay={1} fillWidth justifyContent="flex-start" paddingBottom="m"> */}
					<Text
						// wrap="balance"
						// onSolid="neutral-weak"
						variant="heading-default-m">
						<TypeAnimationComponent sequence={sequence} />
					</Text>
					{/* </RevealFx> */}
					{/* <LetterFx
						speed="fast"
						trigger="instant"
						charset={codePoints.map((cp) => String.fromCodePoint(cp))}
					>
						{EarthDescText}
					</LetterFx> */}
				</Flex>
				{/* <Flex
					flex={3}
					alignItems="center"
					paddingX="20"
				>
					<Posts range={[1, 2]} columns="2" />
				</Flex> */}
			</RevealFx>
			{/* <Column
				fillWidth
				paddingY="l" gap="m">

				<Ufo />
				</Column> */}
			<Column
				fillWidth
				paddingY="l" gap="m">
				<Column
					maxWidth="s">
					<RevealFx
						translateY="4" fillWidth justifyContent="flex-start" paddingBottom="m">
						<Heading
							wrap="balance"
							variant="display-strong-l">
							{home.headline}
						</Heading>
					</RevealFx>
					<RevealFx
						translateY="8" delay={0.2} fillWidth justifyContent="flex-start" paddingBottom="m">
						<Text
							wrap="balance"
							onBackground="neutral-weak"
							variant="heading-default-xl">
							{home.subline}
						</Text>
					</RevealFx>
					<RevealFx translateY="12" delay={0.4} justifyContent="flex-start">
						<Button
							id="about"
							data-border="rounded"
							href="/about"
							variant="secondary"
							size="m"
							arrowIcon>
							<Flex
								gap="8"
								alignItems="center">
								{about.avatar.display && (
									<Avatar
										style={{ marginLeft: '-0.75rem', marginRight: '0.25rem' }}
										src={person.avatar}
										size="m" />
								)}
								{about.title}
							</Flex>
						</Button>
					</RevealFx>
				</Column>
			</Column>
			<RevealFx translateY="16" delay={0.6}>
				<Projects range={[1, 1]} />
			</RevealFx>
			{routes['/blog'] && (
				<Flex
					fillWidth gap="24"
					mobileDirection="column">
					<Flex flex={1} paddingLeft="l">
						<Heading
							as="h2"
							variant="display-strong-xs"
							wrap="balance">
							Latest from the blog
						</Heading>
					</Flex>
					<Flex
						flex={3} paddingX="20">
						<Posts range={[1, 2]} columns="2" />
					</Flex>
				</Flex>
			)}
			<Projects range={[2]} />
			{newsletter.display &&
				<Mailchimp newsletter={newsletter} />
			}
		</Column>
	);
}
