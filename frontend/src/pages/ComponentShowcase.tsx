import { Button, Card, Input, Textarea } from '@/components/common';
import { useState } from 'react';

export default function ComponentShowcase() {
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');

  return (
    <div className="min-h-screen bg-bg-dark text-text-primary p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-accent-blue mb-2">
            Component Showcase
          </h1>
          <p className="text-text-secondary font-mono">
            Testing all reusable UI components
          </p>
        </div>

        {/* Buttons Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-accent-blue">
            // Buttons
          </h2>
          
          <div className="space-y-6">
            {/* Variants */}
            <div>
              <h3 className="text-lg font-mono text-text-secondary mb-3">Variants:</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="ghost">Ghost Button</Button>
              </div>
            </div>

            {/* Sizes */}
            <div>
              <h3 className="text-lg font-mono text-text-secondary mb-3">Sizes:</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            {/* States */}
            <div>
              <h3 className="text-lg font-mono text-text-secondary mb-3">States:</h3>
              <div className="flex flex-wrap gap-4">
                <Button>Normal</Button>
                <Button isLoading>Loading</Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>

            {/* Full Width */}
            <div>
              <h3 className="text-lg font-mono text-text-secondary mb-3">Full Width:</h3>
              <Button fullWidth variant="primary">Full Width Button</Button>
            </div>
          </div>
        </section>

        {/* Cards Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-accent-blue">
            // Cards
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <h3 className="text-xl font-semibold mb-2">Basic Card</h3>
              <p className="text-text-secondary">
                A card with default hover effects
              </p>
            </Card>

            <Card gradient>
              <h3 className="text-xl font-semibold mb-2">Card with Gradient</h3>
              <p className="text-text-secondary">
                Hover to see top gradient
              </p>
            </Card>

            <Card hover={false}>
              <h3 className="text-xl font-semibold mb-2">Static Card</h3>
              <p className="text-text-secondary">
                No hover effects
              </p>
            </Card>
          </div>
        </section>

        {/* Inputs Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-accent-blue">
            // Form Fields
          </h2>
          
          <div className="max-w-2xl space-y-6">
            {/* Normal Input */}
            <Input
              label="Name"
              placeholder="Enter your name"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />

            {/* Input with Helper Text */}
            <Input
              label="Email"
              type="email"
              placeholder="your.email@example.com"
              helperText="We'll never share your email"
            />

            {/* Input with Error */}
            <Input
              label="Username"
              placeholder="Choose a username"
              error="Username is already taken"
            />

            {/* Textarea */}
            <Textarea
              label="Message"
              placeholder="Enter your message..."
              value={textareaValue}
              onChange={(e) => setTextareaValue(e.target.value)}
              rows={4}
            />

            {/* Textarea with Error */}
            <Textarea
              label="Bio"
              placeholder="Tell us about yourself..."
              error="Bio must be at least 50 characters"
              rows={4}
            />
          </div>
        </section>

        {/* Combined Example */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-accent-blue">
            // Combined Example
          </h2>
          
          <Card className="max-w-2xl">
            <h3 className="text-2xl font-semibold mb-4">Contact Form Preview</h3>
            <div className="space-y-4">
              <Input label="Name" placeholder="John Doe" />
              <Input label="Email" type="email" placeholder="john@example.com" />
              <Textarea label="Message" placeholder="Your message..." rows={4} />
              <Button variant="primary" fullWidth>
                send_message()
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
