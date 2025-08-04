// import React from 'react';

type AvatarProps = {
    alt?: string;
    fallback: string;
    src?: string | null;
};

const Avatar = ({ alt, fallback, src }: AvatarProps) => {
    const hasImage = typeof src === 'string' && src.trim() !== '';

    return (
        <button
            className="flex items-center gap-2 border border-border rounded-full px-2 py-1 bg-[#ffe0c2] text-primary-foreground"
            type="button"
            tabIndex={0}
            aria-label={`Cliente ${alt}`}
        >
            {hasImage ? (
                <img
                    src={src!}
                    alt={alt || fallback}
                    className="w-6 h-6 rounded-full object-cover"
                />
            ) : (
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-sm font-medium uppercase">
                    {fallback}
                </div>
            )}

            <span className="text-sm font-medium">
                {alt || fallback}
            </span>
        </button>
    );
};

export default Avatar;
