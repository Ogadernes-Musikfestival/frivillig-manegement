import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Tailwind,
  Text,
  Section,
} from "@react-email/components";
import * as React from "react";
// Adjust this path to where your tailwind config lives
const festivalTheme = {
  theme: {
    extend: {
      colors: {
        neonGreen: "#39ff14", // Replace with your exact hex from your config
        purple: "#7e22ce", // Replace with your exact hex from your config
        dark: "#1a1a1a",
      },
    },
  },
};

interface WelcomeEmailProps {
  navn: string;
}

export const WelcomeEmail = ({ navn = "Frivillig" }: WelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      {/* We pass your existing config here. 
        React Email will "inline" these styles automatically. 
      */}
      <Tailwind config={festivalTheme}>
        <Body className="bg-white font-sans py-10">
          <Container className="border-2 border-purple border-b-8 p-8 mx-auto max-w-xl">
            <Heading className="text-purple text-2xl font-bold mb-6"></Heading>

            <Section className="bg-neonGreen p-6 rounded-md mb-6">
              <Text className="text-black font-bold text-lg m-0">
                Hej {navn}! Mange tak for din tilmelding.
              </Text>
            </Section>

            <Text className="text-dark text-lg leading-relaxed">
              Ultimo april sender vi mere information om din mødetid og den
              opgave, du skal hjælpe med. Allerede nu kan du sætte kryds i
              kalenderen den 22. april kl. 19.30–20.30, hvor vi inviterer til et
              fælles infomøde for alle frivillige.
            </Text>

            <Text className="text-dark text-lg leading-relaxed">
              Her kan du høre mere om ØMFEST, møde nogle af de andre frivillige
              og få et kig på festivalpladsen. Du får også mulighed for at møde
              Kaja og Mads, som begge er frivilligkoordinatorer. Det er helt
              frivilligt at deltage, og der er ikke mødepligt, men du er meget
              velkommen. Mødet afholdes i Beboernes Hus på Livøsmøgen 40.
            </Text>

            <Text className="text-dark text-lg leading-relaxed">
              Vi glæder os til at have dig med på holdet og vender snart tilbage
              med mere information.
            </Text>

            <Text className="text-dark text-lg leading-relaxed">
              Musikalske hilsner ØMFEST
            </Text>

            <Text className="text-purple text-sm mt-10 italic">
              Har du spørgsmål på forhånd, skriv til Kaja på
              frivillig@oemfest.dk
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WelcomeEmail;
